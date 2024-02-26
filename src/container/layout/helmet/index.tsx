import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

const THelmet = () => {
  const { type, title, description, relativePath, image, imageAlt, url, siteName, creators, twitterSite } = useSelector(
    (state: RootState) => state.helmet,
  );
  return (
    <HelmetProvider>
      <Helmet>
        {description && (
          <>
            <meta name="description" content={description} />
            <meta property="og:description" content={description} />
            <meta name="twitter:description" content={description} />
          </>
        )}
        {type && (
          <>
            <meta name="type" content={type} />
            <meta property="og:type" content={type} />
            <meta name="twitter:type" content={type} />
          </>
        )}
        {title && (
          <>
            <title>{title}</title>
            <meta property="og:title" content={title} />
            <meta name="twitter:title" content={title} />
          </>
        )}
        {siteName && <meta property="og:site_name" content={siteName} />}
        {image && (
          <>
            <meta name="image" content={image} />
            <meta property="og:image" content={image} />
            <meta name="twitter:image" content={image} />
          </>
        )}
        {imageAlt && (
          <>
            <meta name="image:alt" content={image} />
            <meta property="og:image:alt" content={image} />
            <meta name="twitter:image:alt" content={image} />
          </>
        )}
        {url && (
          <>
            <meta property="og:url" content={url} />
          </>
        )}
        {relativePath && <link rel="canonical" href={relativePath} />}
        {creators && (
          <>
            <meta name="author" content={creators} />
            <meta property="og:author" content={creators} />
            <meta name="twitter:creator" content={creators} />
          </>
        )}
        {twitterSite && <meta name="twitter:site" content={twitterSite} />}
      </Helmet>
    </HelmetProvider>
  );
};

export default THelmet;
