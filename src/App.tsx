import { Blog, Clients, Header, Mission } from "./components"

function App() {
  return (
    <>
      <Header />

      <main>
        <Mission />
        <Clients />
        <Blog />

      </main>
      {/* <footer>
        <img src='https://placekitten.com/200/300' alt="Photo" />
        <ul>
          <li>
            <p>Robin Heij</p>
          </li>

          <li>
            <p>Freelance Developer</p>
          </li>

          <li>
            <p>Based in Rotterdam, the Netherlands</p>
          </li>

          <li>
            <p>Copyright</p>
          </li>
        </ul>
      </footer> */}
    </>
  )
}

export default App
