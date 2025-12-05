import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const WEBHOOK_URL = "https://discord.com/api/webhooks/1446170962444947640/GpobdyocH2InCIwiq46f8O5Dgr_e9yBB-eKkz3WZssbNvjvE5Kt_8EcL_IfqWCMH_AVL";  // ←ここに貼る！

app.post("/api/contact", async (req, res) => {
    const { name, email, message } = req.body;

    const content = {
        embeds: [
            {
                title: "📩 新しいお問い合わせ",
                color: 0x00aaff,
                fields: [
                    { name: "名前", value: name },
                    { name: "メール", value: email },
                    { name: "内容", value: message }
                ],
                footer: { text: "Reynexis Studio お問い合わせ" }
            }
        ]
    };

    try {
        await fetch(WEBHOOK_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(content)
        });

        res.json({ message: "送信されました！Discord を確認してください。" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "エラーが発生しました。" });
    }
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
