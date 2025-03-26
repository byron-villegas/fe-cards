import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS
import "../styles/globals.css"; // Import custom CSS
import CardList from "@component/components/card-list";

export default function Page() {
  return <div className="container-fluid"><CardList /></div>
}