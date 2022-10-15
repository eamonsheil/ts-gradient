import { createRoot } from "react-dom/client";
import App from "./App";

const container = document.getElementById('root');
let root;
if (container !== null) {
    root = createRoot(container);
    if (root !== null) {
        root.render(<App />);
    }
} else {
    throw new Error('cannot locate root element in "./index.html"');
}