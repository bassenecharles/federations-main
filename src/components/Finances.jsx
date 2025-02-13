import React, { useState } from 'react';
import './Finances.css';

function Finances() {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');

  // Dummy data for financial transactions
  const initialTransactions = [
    { id: 1, date: '2024-08-05', description: 'Inscription Club A', type: 'Revenu', amount: 500, category: 'Inscriptions' },
    { id: 3, date: '2024-08-03', description: 'Subvention Ligue B', type: 'Revenu', amount: 1000, category: 'Subventions' },
    { id: 4, date: '2024-08-02', description: 'Licence Joueur Y', type: 'Revenu', amount: 50, category: 'Licences' },
    { id: 5, date: '2024-08-01', description: 'Réclamation Club Z', type: 'Revenu', amount: 25, category: 'Réclamations' },
  ];

  const [transactions, setTransactions] = useState(initialTransactions);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleTypeFilterChange = (event) => {
    setTypeFilter(event.target.value);
  };

  const filteredTransactions = transactions.filter(transaction => {
    const searchMatch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase());
    const typeMatch = typeFilter === 'all' || transaction.type === typeFilter;
    return searchMatch && typeMatch;
  });

  // Calculate total income and expenses
  const totalIncome = transactions
    .filter(transaction => transaction.type === 'Revenu')
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const totalExpenses = transactions
    .filter(transaction => transaction.type === 'Dépense')
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const balance = totalIncome - totalExpenses;

  return (
    <div className="finances-page">
      <h2>Gestion des Finances</h2>

      <section className="financial-summary">
        <h3>Résumé Financier</h3>
        <div className="summary-item">
          <span>Revenu Total:</span>
          <span>{totalIncome} €</span>
        </div>
        <div className="summary-item">
          <span>Dépenses Totales:</span>
          <span>{totalExpenses} €</span>
        </div>
        <div className="summary-item">
          <span>Solde:</span>
          <span>{balance} €</span>
        </div>
      </section>

      <div className="filters-container">
        <input
          type="text"
          placeholder="Rechercher une transaction..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <select value={typeFilter} onChange={handleTypeFilterChange}>
          <option value="all">Tous les types</option>
          <option value="Revenu">Revenu</option>
          <option value="Dépense">Dépense</option>
        </select>
      </div>

      <section className="transactions-table">
        <h3>Liste des Transactions</h3>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Type</th>
              <th>Montant</th>
              <th>Catégorie</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map(transaction => (
              <tr key={transaction.id}>
                <td>{transaction.date}</td>
                <td>{transaction.description}</td>
                <td>{transaction.type}</td>
                <td>{transaction.amount} €</td>
                <td>{transaction.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="financial-actions">
        <h3>Actions</h3>
        <div className="actions-container">
          <button>Ajouter un Revenu</button>
          <button>Ajouter une Dépense</button>
          <button>Générer un Rapport</button>
        </div>
      </section>
    </div>
  );
}

export default Finances;
