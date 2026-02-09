import {Helmet} from 'react-helmet-async';
export default function MetaData ({title}){
    return(
        <Helmet>
            <title>{`${title} - Ecommerce-V0.1`}</title>
        </Helmet>
    )
}