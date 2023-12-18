import './Nav.scss';
import { Link } from 'react-router-dom';
import { nav_links } from '../../../data/data';

export default function Nav() {
    const mappedLinks = nav_links.map((link, index) => {
        return (
            <li key={index}>
                <Link to = {link.path}>{link.name}</Link>
            </li>
        )
    })
  return (
    <nav>
        <ul className='header-nav'>
            {mappedLinks}
        </ul>
    </nav>
  )
}
