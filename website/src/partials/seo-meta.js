import { Helmet } from 'react-helmet';
import React from 'react';

// interface MetaProps = {
//     title: string;
//     description: string;
//     type: string;
//     url: string;
//     summary: string;
//     site: string;
//     creator: string;
//     icon: string;
//     image: string;
//     cannonical: string;
//     script: string;
//     link: string;
//     h1: string;
//     h2: string;
//     keywords: string;
// }

const Meta = (props) => {
    return <Helmet>
        <title>{props.title}</title>
        {props.h1 && <h1>{props.h1}</h1>}
        {props.h2 && <h2>{props.h2}</h2>}
        {props.description && <meta name="description" content={props.description} />}
        {props.keywords && <meta name="keywords" content={props.keywords} />}
        {props.type && <meta property="og:type" content={props.type} />}
        {props.title && <meta name="og:title" property="og:title" content={props.title} />}
        {props.description && <meta name="og:description" property="og:description" content={props.description} />}
        {props.siteName && <meta property="og:site_name" content={props.siteName} />}
        {props.url && <meta property="og:url" content={props.url} />}
        {props.summary && <meta name="twitter:card" content={props.summary} />}
        {props.title && <meta name="twitter:title" content={props.title} />}
        {props.description && <meta name="twitter:description" content={props.description} />}
        {props.site && <meta name="twitter:site" content={props.site} />}
        {props.creator && <meta name="twitter:creator" content={props.creator} />}
        {props.icon && <link rel="icon" type="image/png" href={props.icon} />}
        {props.icon && <link rel="apple-touch-icon" href={props.icon} />}
        {props.link && <link rel="stylesheet" href={props.link} />}
        {props.image && <meta property="og:image" content={props.image} />}
        {props.image && <meta name="twitter:image" content={props.image} />}
        {props.canonical && <link rel="canonical" href={props.canonical} />}
        {props.script && <script type="application/ld+json">{props.script}</script>}
    </Helmet>
}
export default Meta;