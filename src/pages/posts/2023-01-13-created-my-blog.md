---
title: ブログを自作した
date: 2023-01-13
layout: '../../layouts/Post.astro'
---

文章を書くということに対する苦手意識を改善したい、また自分の考えや行動を後から振り返られるようにするべく、ブログの投稿の習慣化を今年の目標にしている。

普段ブログの投稿先としては Medium を利用していてこれを使い続けても良かったのだが、モチベーションへ多少貢献するかもなという考えからブログを自作することにした。Medium から移行できるだけの最低限の出来にはなったため、テストも兼ねてこの記事を書いている。

## 技術的な話

Markdown でブログの記事を記述するという前提のもと、最近単語として見かける頻度が多く気になっていた Web フレームワークである [Astro](https://astro.build) を採用した。

Astro では Markdown が標準でサポートされており、特定の directory に Markdown ファイルを配置するだけで HTML への変換やルーティング、また Code blocks の Syntax Highlights までを行ってくれる。そのためページレイアウトについて多少コードを書くだけでブログとしての体を成すだけの機能はすぐに完成した。

- [Pages 🚀 Astro Documentation](https://docs.astro.build/en/core-concepts/astro-pages/#markdownmdx-pages)
- [Markdown & MDX 🚀 Astro Documentation](https://docs.astro.build/en/guides/markdown-content)

また Astro ではページレイアウトに Astro フォーマットを使うのだが、このフォーマットでは HTML や JSX に近い形で記述できることもあり、直感的かつスムーズに実装を進めることができた。

- [Components 🚀 Astro Documentation](https://docs.astro.build/en/core-concepts/astro-components/)

故に Astro を使うのは初めてだったのにも関わらず、ブログの機能としての実装はすぐに終わっていて、ほとんどの時間はスタイルに費やしていた。

Markdown をそのままページにする機能のおかげでブログそのものは簡単に形にはなった一方で、この形式をそのまま使い続けることはないなと思っている。これは Markdown を直接ページにする形式だと拡張性がないという理由から。

例えば直近だと記事内の画像を WebP で配信したいモチベーションがある。Astro には Next.js における Image Optimization API のように画像のリサイズや圧縮、複数の画像のフォーマットの配信をサポートするための integrations として `@astrojs/images` があるのだが、これは執筆当時では Markdown をそのままページ化する方法だと利用することができない。

- [Images 🚀 Astro Documentation](https://docs.astro.build/en/guides/images/#astros-image-integration)

また Medium のように画像をクリックしたときに拡大させる、また URL 先の OG を展開するみたいなことも将来的にやりたくなる気がしていて、これを実現するのも今の構造だとやっぱり難しい。

Astro では MDX もサポートされているため、MDX を使うことでほぼ Markdown の形を取りつつ機能の拡張を持たせることができる。先にあげた WebP 対応のためは一旦はこの方式を取ろうと考えている。しかしながらブログ記事のような文章は主に移行の観点からプレーンな Markdown で書いておきたい気持ちはあって、そうなると結局 Remark で自分でレンダリングするようなコードを書いていくことになるんだろうなとは思っている。

スタイルに関しては一から CSS を書きたくなかったので Tailwind CSS を利用した。Tailwind CSS を使う機会がそこそこ増えてきたので開発のための環境をこのタイミングで整えたのだが、Language Server が提供されていることもあって NeoVim でも快適に開発することができた。utility の補完もそうだが、特にある utility を当てたときにその class に適用される CSS の内容を把握できるため、ドキュメントを逐次確認しに行かなくても良いというのがありがたい。

Astro のデプロイ先としては Vercel を使っている。Vercel を触ったことがあまりなかったので、開発のプラットフォームとして体験を経験してみたかったというのが理由。

Astro では Vercel 含め様々なプラットフォームへのデプロイがサポートされており、またドキュメントも充実しているため、特に詰まることなくデプロイの環境の整備ができた。

- [Deploy your Astro Site 🚀 Astro Documentation](https://docs.astro.build/en/guides/deploy/)

全体的に Astro の開発体験はかなりよく、ちょっとしたサイトを作る際に採用をしたいなと思った。

## おわりに

せっかくブログを自作したので、ここで満足せずに積極的に記事を書いていきたい。未来の自分頑張ってほしい。
