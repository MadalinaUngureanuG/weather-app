import { Container } from "react-bootstrap"
import Meta from "./Meta"

export default function Layout({ children }: {children: React.ReactNode}) {
    return (
        <>
        <Meta />
        <Container fluid className="container">
                {children}
        </Container>
        </>
    )
}