import { db } from "../db.js";

export const getLivros = (req, res) => {
  let sql = "SELECT * FROM livros";
  const filters = [];
  
  // Verifica se existe um filtro por nome e adiciona ao SQL
  if (req.query.nome) {
    filters.push(`livro LIKE '%${req.query.nome}%'`);
  }

  // Verifica se existe um filtro por status e adiciona ao SQL
  if (req.query.status) {
    filters.push(`status = ${req.query.status}`);
  }

  // Se houver filtros, adiciona ao SQL
  if (filters.length) {
    sql += " WHERE " + filters.join(" AND ");
  }

  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json(data);
  });
};


export const addLivro = (req, res) => {
  const sql =
    "INSERT INTO livros(`livro`, `data`, `autor` ,`status`) VALUES(?)";

  const values = [
    req.body.livro,
    req.body.data,
    req.body.autor,
    req.body.status,
  ];

  db.query(sql, [values], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Livro adicionado");
  });
};

export const updateLivro = (req, res) => {
  const sql =
    "UPDATE livros SET `livro` = ?, `data` = ?, `autor` = ?, `status` = ? WHERE `id` = ?";

  const values = [
    req.body.livro || "",
    req.body.data || null,
    req.body.autor || "",
    req.body.status || 0,
  ];

  db.query(sql, [...values, req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Livro atualizado com sucesso.");
  });
};

export const updateStatus = (req, res) => {
  const sql = "UPDATE livros SET `status` = ? WHERE `id` = ?";

  db.query(sql, [req.body.status, req.params.id], (err) => {
    if (err) return res.json(err);
    return res.status(200).json("Status atualizado com sucesso.");
  });
};

export const deleteLivro = (req, res) => {
  const q = "DELETE FROM livros WHERE `id` = ?";

  db.query(q, [req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json(" deletado com sucesso.");
  });
};

