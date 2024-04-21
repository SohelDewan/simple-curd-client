
import './App.css'

function App() {

  const handleAddUser = (e)=>{
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = {name, email};
    console.log(user);

    fetch('http://localhost:5000/users/',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(res=>res.json())
    .then(data=>{
      console.log(data);
      if(data.insertedId){
        alert('User added successfully');
        form.reset();
      }
    })
  }

  return (
    <>
      <h1>Simple CURD</h1>
      <form onSubmit={handleAddUser}>
        <input type='text' name='name' id='' placeholder='Name' /><br />
        <input type='email' name='email' id='' placeholder='Email'/><br />
        <input type='submit' value='Add User'  />
      </form>
    </>
  )
}

export default App
