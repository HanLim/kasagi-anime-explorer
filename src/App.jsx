import { Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Details from './components/Details';
import Footer from './components/Footer';
import Header from './components/Header';
import NotFound from './components/404';

const App = () => {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path='/anime/:id' element={<Details />} />
                <Route path="/*" element={<NotFound />} />
            </Routes>
            <Footer />
        </>
    );
}

export default App;
