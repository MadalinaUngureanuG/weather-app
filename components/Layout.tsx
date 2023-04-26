import { Container } from "react-bootstrap"
import Header from "./Header"
import Meta from "./Meta"

export default function Layout({ children }: {children: React.ReactNode}) {
    return (
        <>
        <Meta />
        <Container fluid className="container">
            {/* <Header /> */}
             <main>
                {children}
             </main>
        </Container>
        </>
    )
}