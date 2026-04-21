import { useState, useEffect } from 'react';
import type { User } from '../types/User';

function DropDown() {
  const [users, setUsers] = useState<[User]>();
  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://jsonplaceholder.typicode.com/users?_limit=${count}`);
        const json = await res.json();
        setUsers(json);
      } catch (err) {
        setError('Something is wrong!');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [count]);

  return (
    <>
      <select name="DropDown" id="DropDown" onChange={(e) => setCount(Number(e.target.value))}>
        <option>välj antal användare</option>
        <option value="3">3 användare</option>
        <option value="5">5 användare</option>
        <option value="10">10 användare</option>
      </select>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {users &&
        users.map((user) => (
          <div key={user.id}>
            <p>{user.name}</p>
            <p>{user.email}</p>
          </div>
        ))}
    </>
  );
}
export default DropDown;
