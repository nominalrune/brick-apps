- [x] アプリ一覧表示を作る
- [x] レコード一覧画面を作る
- [x] レコード新規作成画面を作る
- [x] レコード詳細画面を作る
- [ ] アプリ編集機能を作る
    - [ ] useApiを作り、csrfを通過する
    - [ ] フォームをuseApiを使うフックにする（→正常にデータをサーバーに送れることを確認）
    - [ ] (jsonの文字列としてDBに保存されてしまう問題を解決する)
- [ ] レコード編集機能を作る
- [ ] レコード削除機能を作る
- [ ] reference機能を作る
- [ ] アプリ作成のパレットにカスタムブロックを追加
- [ ] アプリ削除機能を作る
- [ ] レコード検索機能を作る

backend
controllerをindex, store, uodate, destroyで分ける


# frontend
（のちのち独立したsubrepositoryにしたいが、いまはresource内でよい。）

inertiaの範囲内でやること⸺
はじめにはデータロードせず、
データ取得はapiでやる


domainのなかで、app, record, user, groupそれぞれのservice, model, hook, componentを配置する

共通部分はdomainの外の
common/hooksとか、なんとかで、baseClassとして用意していく

- domain/
  - App/
    - models/
    - services/
      - UpdateService
      - ParseService
    - hooks/
    - components/
  - Records/
- common/
  - hooks/
    - useLocalStorge
  - services/
    - BaseUpdateService（いろんなリポジトリにアップデートをかけるまとめ役。event drivenにしないために、update時の処理はここに集める。）
    - 
Monthなどのクラスをどこに配置するかは考えないと。パッケージ化しちゃう?



ところで、textareを拡張した、markdownエリアを作りたいな。



Record