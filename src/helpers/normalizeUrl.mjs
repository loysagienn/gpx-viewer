const normalizePath = (path) => {
    path = path.toLowerCase();

    if (path.endsWith('/')) {
        path = path.slice(0, -1);
    }

    if (!path.startsWith('/')) {
        path = `/${path}`;
    }

    return path;
};

const normalizeUrl = (url) => {
    if (!url || url === '/') {
        return '/';
    }

    const [path, query] = url.split('?');

    const normoalizedPath = normalizePath(path);

    if (query) {
        return `${normoalizedPath}?${query}`;
    }

    return normoalizedPath;
};

export default normalizeUrl;
