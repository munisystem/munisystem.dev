---
title: 'Astro 2.0 からサポートされた Content Collections を使うようにした'
date: 2023-01-26
---

先日 Astro 2.0 がリリースされた。2.0 でいくつか機能が追加されたが、中でも Markdown と MDX が型安全になる Content Collections が気になった。

- [Astro 2.0 | Astro](https://astro.build/blog/astro-2/)
- [Introducing Content Collections: Type-Safe Markdown in Astro 2.0 | Astro](https://astro.build/blog/introducing-content-collections/)

Astro で Markdown 及び MDX を使う場合、ページの生成に必要となるメタデータ、例えば記事のタイトル、公開日時、タグの一覧などの情報は Front-matter に記述する。

Content Collections はざっくり言うとこの Front-matter に schema を定義することができるようになる機能。これによって Markdown や MDX ファイルで必要な properties の欠如や型の不一致の検知、また properties の補完がエディア上で働くようになる。

特に properties に対して補完が効くようになるというのは個人的には生産性の観点で嬉しく、また Astro で Markdown や MDX で記事を書く場合の de-facto になりそうという理由から、このブログも Content Collections に移行した。

## やったこと

移行に関しては Astro の Content Collections のドキュメントを参考にした。

- [Content Collections 🚀 Astro Documentation](https://docs.astro.build/en/guides/content-collections/)


おおよそ以下のようなことをやった。

- `src/pages` 以下に配置していた Markdown ファイルを `src/content` に移動
- Markdown の Front-matter の schema を `src/content/config.ts` で定義
- Markdown の一覧の取得を `Astro.glob()` から `getCollections()` に変更
- 記事の生成を File-based Routing から Dynamic Routing に変更に変更
- Build target を server (SSR) から static (SSG) に変更

具体的な変更内容については以下の通り。

- https://github.com/munisystem/munisystem.dev/pull/1/files
- https://github.com/munisystem/munisystem.dev/commit/6ac22eb703ad3ebd2bceb0d4e40db39659a48f6f

特筆すべき点はあまり無いのだが、一点 Build target の変更に関して補足しておく。

本来は Content Collections を使うだけであれば Build target を static に変える必要は無い。しかしながら執筆時点では server (SSR) だと Dynamic Routing を利用するケースにおいて、status code 404 を返す際に事前に定義したページ (`src/pages/404.astro`) が使うことができない。

厳密には SSR でも `/404` に redirect させる、あるいは [Middleware](https://docs.astro.build/en/guides/integrations-guide/node/#middleware) を利用することで解消はできる。しかしながら status code 404 時に redirect を経由するという挙動は個人的には好みでは無いのと、また Middleware を使うのは too much であることから採用するに至らなかった。

もともと Build target を server にしていたのは Astro の Vercel Integrations のドキュメントの Installation で紹介されていたからという理由で、Vercel でも設定さえすれば static が使えるのと、また SSR を使う本質的な理由もなくむしろ static を生成したほうがページの表示のパフォーマンス的にも良くなるはずで、こういった理由もあって Build target を static に変えている。
