export default async function handler(req, res) {
    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;

    const response = await fetch(
        `https://graph.instagram.com/me?fields=id,username,account_type&access_token=${accessToken}`
    );

    if (!response.ok) {
        return res.status(500).json({ error: "Failed to fetch Instagram profile" });
    }

    const data = await response.json();
    res.status(200).json(data);
}
