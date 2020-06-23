import React, { useEffect, useState } from 'react';
import Users from './components/users/Users';
import Toggle from './components/toggle/Toggle';

export default function App() {

  const [users, setUsers] = useState([]);
  const [showUsers, setShowUsers] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch('https://randomuser.me/api/?seed=rush&nat=br&results=10');
      const json = await res.json();

      setUsers(json.results);
    }

    fetchUsers();
  }, []);

  const handleShowUsers = (isChecked) => {
    setShowUsers(isChecked);
  }

  return (
    <div className="container" >
      <h3>React Lifecycle</h3>
      <div className="divider"></div>
      <div className="section">
        <Toggle
          description="Show users"
          enabled={showUsers}
          onToggle={handleShowUsers}
        />
      </div>
      <div className="divider"></div>
      <div className="section">
        {showUsers && <Users users={users} />}
      </div>
    </div >
  );
}
