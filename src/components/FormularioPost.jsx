import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function NewPostForm() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) {
      setMessage('Por favor complete título y contenido antes de enviar.');
      return;
    }
    setLoading(true);
    setMessage('');
    try {
      const res = await fetch('http://localhost:3000/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: title.trim(), body: body.trim(), createdAt: new Date().toISOString() }),
      });
      if (!res.ok) {
        // intenta leer texto de respuesta para dar más contexto
        const text = await res.text().catch(() => '');
        throw new Error(`Error ${res.status} ${res.statusText} ${text}`);
      }
      // limpiar campos luego de envio
      setTitle('');
      setBody('');
      // mostrar mensaje breve y luego forzar recarga en la raíz para que el listado se actualice
      setMessage('Post creado correctamente. Redirigiendo y recargando el listado...');
      setTimeout(() => {
        // redirige a la raíz y fuerza recarga completa para asegurar que se traigan los posts nuevos
        window.location.href = '/';
      }, 1000);
    } catch (err) {
      // mostrar mensaje de error más informativo
      setMessage(`No se pudo crear el post. ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Crear nuevo post</h2>
      <p><Link to="/">← Volver al listado de posts</Link></p>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Título</label><br />
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (message) setMessage('');
            }}
            placeholder="Título del post"
          />
        </div>
        <div>
          <label>Contenido</label><br />
          <textarea
            value={body}
            onChange={(e) => {
              setBody(e.target.value);
              if (message) setMessage('');
            }}
            placeholder="Contenido del post"
          />
        </div>
        <div>
          <button type="submit" disabled={loading || !title.trim() || !body.trim()}>
            {loading ? 'Enviando...' : 'Crear post'}
          </button>
        </div>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}