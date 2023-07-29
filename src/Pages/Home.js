import Main from "./Main"
import Navbarx from "./Navbarx"
import Footerx from "./Footerx"
import BeritaUtama from "./BeritaUtama"
import BeritaList from "./BeritaList"

const Home = () => {
    return (
        <>
        <Navbarx />
        <BeritaUtama />
        <Main />
        <BeritaList />
        <Footerx />
        </>
    )
}
export default Home