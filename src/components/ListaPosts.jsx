import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function PostsList() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    async function fetchPage() {
      setLoading(true);
      try {
        const res = await fetch(
          `http://localhost:3000/posts?_page=${page}&_limit=${limit}&_sort=createdAt&_order=desc`,
          { signal: controller.signal }
        );
        if (!res.ok) throw new Error('Error fetching');
        const data = await res.json();
        const totalCount = res.headers.get('X-Total-Count') || data.length;
        setPosts(data);
        setTotal(Number(totalCount));
      } catch (err) {
        setPosts([]);
        setTotal(0);
      } finally {
        setLoading(false);
      }
    }
    fetchPage();
    return () => controller.abort();
  }, [page, limit]);

  const totalPages = Math.max(1, Math.ceil(total / limit));
  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
    if (page < 1) {
      setPage(1);
    }
  }, [totalPages]);

  return (
    <div>
      <h2>Listado de posts</h2>
      <p><Link to="/posts/new">+ Crear nuevo post</Link></p>

      {loading ? (
        <p>Cargando...</p>
      ) : (
        <>
          {posts.length === 0 ? (
            <p>No hay posts.</p>
          ) : (
            <ul>
              {posts.map(p => (
                <li key={p.id}>
                  <strong>{p.title}</strong><br />
                  <small>{p.body}</small>
                </li>
              ))}
            </ul>
          )}
        </>
      )}

      <div>
        <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1 || loading}>
          Anterior
        </button>
        <span> Página {page} / {totalPages} </span>
        <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page >= totalPages || loading}>
          Siguiente
        </button>
      </div>
    </div>
  );
}