import { useState } from "react";
import { IndexPage } from "./routes";
// import "./App.css";

function App() {
	const [count, setCount] = useState(0);

	return (
		<>
			<h1>Hello Hono</h1>
			<IndexPage />
		</>
	);
}

export default App;
