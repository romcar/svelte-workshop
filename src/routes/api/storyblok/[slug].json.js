import { storyblok } from '../../../store/index';

// SECTION CMS get request example
export async function get(req, res) {
    const { slug } = req.params;

    res.writeHead(200, {
        'Content-Type': 'application/json'
    });

    storyblok.get(`cdn/stories/${slug}`)
    .then((cms) => {
        res.end(JSON.stringify(cms.data.story.content));
    });
}

// !SECTION