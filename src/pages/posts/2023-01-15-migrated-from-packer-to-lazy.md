---
title: NeoVim のプラグインマネージャーを packer.nvim から lazy.nvim に移行した
date: 2023-01-15
layout: '../../layouts/Post.astro'
---

最近 lazy.nvim という NeoVim のプラグインマネージャーの存在を知った。

- [folke/lazy.nvim: 💤 A modern plugin manager for Neovim](https://github.com/folke/lazy.nvim)

README や [Reddit](https://www.reddit.com/r/neovim/comments/zqk5ds/lazynvim_a_new_plugin_manager_for_neovim/) を眺めていて良さそうだったこともあり、プラグインマネージャーを [packer.nvim](https://github.com/wbthomason/packer.nvim) から lazy.nvim に乗り換えた。移行して数日経過したが、特に問題や困ることもなく普通に使えている。

この記事では主に自分のメモとして、移行に際して設定したことや移行の背景を残しておく。

## 移行手順について

lazy.nvim の README に packer.nvim からの移行方法が紹介されている。基本的にはこれに従えば良い。

- [📦 Installation | folke/lazy.nvim: 💤 A modern plugin manager for Neovim](https://github.com/folke/lazy.nvim#-installation)
- [📦 Migration Guide | folke/lazy.nvim: 💤 A modern plugin manager for Neovim](https://github.com/folke/lazy.nvim#-migration-guide)

おそらく大抵のケースでは `require("packer").startup()` を `require("lazy").setup()` に書き換えつつ、ブロック内のプラグインの書式を多少変更するだけになると思う。

**packer.nvim**
```lua
require("packer").startup(function(use)
  use 'neovim/nvim-lspconfig'
  use 'hrsh7th/nvim-cmp'
  use 'hrsh7th/cmp-buffer'
  use {
    'nvim-treesitter/nvim-treesitter',
    run = function() require('nvim-treesitter.install').update({ with_sync = true }) end,
  }
end)
```

**lazy.nvim**

```lua
require("lazy").setup({
  'neovim/nvim-lspconfig',
  'hrsh7th/nvim-cmp',
  'hrsh7th/cmp-buffer',
  {
    'nvim-treesitter/nvim-treesitter',
    build = function() require('nvim-treesitter.install').update({ with_sync = true }) end,
  }
})
```


自分が実際に行った変更は以下の通り。

- https://github.com/munisystem/dotfiles/pull/1/files

## モチベーション

正直なところ NeoVim のプラグインマネージャーとして packer.nvim を使っていて特段困ったことはなかった。

しかしながら lazy.nvim では Lockfile がサポートされている。具体的にはパッケージをインストール、アップデートする際に `lazy-lock.json` というファイルが生成され、これによってインストールするプラグインのバージョンを固定化することができる。この機能の存在が移行の決め手となった。

- [🔒 Lockfile lazy-lock.json | folke/lazy.nvim: 💤 A modern plugin manager for Neovim](https://github.com/folke/lazy.nvim#-lockfile-lazy-lockjson)

というのもインストールしているプラグインのバージョンをあげたことで、NeoVim の動作がおかしくなることはしばしばある。こういったプラグインのバージョンアップは大抵のケースでコードを書く前にやっていて、結果としてコードを書くためにまずは NeoVim の設定を直す必要が生じていた。これに関してコードを書く前に NeoVim が壊れるかもしれないアクションを取るなという話もあるが、エディタを開く必要があるタイミングでバージョンアップを行うという行為に一定の合理性があるはず。

こういったケースで Lockfile を以前の状態に戻して再度プラグインをインストールすればよい、というのは理想的な対応であると思っている。

正確には packer.nvim にも Snapshot と呼ばれる Lockfile に相当するファイルを生成する機能が存在する。しかしながらこの packer.nvim の Snapshot は lazy.nvim と異なり明示的に取得する必要がある。プラグインのアップデートの度に Snapshot の取得を実行するのは現実的ではなく、個人的に実用に耐えなかった。自分でインストールやアップデートの都度 Snapshot を取得するように Lua のスクリプトを書くというのも手ではあったが、そこまでやるのであれば標準で Lockfile をサポートしている lazy.nvim を使ったほうがメンテナンス性も高くていいよね、という話である。

- [ [Feature request] Support package snapshot · Issue #298 · wbthomason/packer.nvim](https://github.com/wbthomason/packer.nvim/issues/298)

なお packer.nvim にも lazy.nvim のような挙動で Snapshot を取ることについて discussion はされているものの、現時点では実装はされていない。故に将来的には packer.nvim でも自分のモチベーションは解消されるかもしれない。

- [Feature: Lockfile support · Issue #1009 · wbthomason/packer.nvim](https://github.com/wbthomason/packer.nvim/issues/1009)

ちなみに packer.nvim で満足しているのであれば lazy.nvim にあえて乗り換える必要は無いと思っている。[lazy.nvim の作者も Reddit で同様のことを言っているし](https://www.reddit.com/r/neovim/comments/zqk5ds/comment/j0ygxrt/?utm_source=reddit&utm_medium=web2x&context=3) 。
