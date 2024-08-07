
# kintoneに対する良い点・嫌な点を書き出す
1. アプリ
	1. アプリのコピー機能が便利
	1. カスタマイズスクリプトをアプリ間で共有することができない・統一適用できない
		1. 共有コードを変えたら、各アプリで再度スクリプトを準備してアップロードしないといけない
	1. plugin開発がすこぶる面倒
	1. イベントサイクルがkintone独自なので、ネイティブと同じノリでカスタマイズできない。kintone独自の知識が必要になる。（eventのタイミングとか考えるの面倒だし、使用がいまいちはっきりしない。）
	1. javascriptのみのカスタマイズなので、セキュアな情報が取扱いにくい。セキュアな情報を取り扱うためのAPI（サーバーでの実行を依頼するためのAPI）がない。
1. レコード
	1. 複合ユニーク制約が設定できない。
		1. composite keyが設定できない
	1. 入力欄の型とDBの型が１対１連動している。
		1. 自由な入力が作れない。詳細画面が1種類に固定される
		1. 意味が似通った欄が増えまくる。
	1. lookup
		1. joinできないのでアプリ間で重複する欄を作らなければならない
		1. スクリプト上で取得できない
		1. 別のアプリとの連携でできることがすごく限られている
			1. 項目をコピーすることのみ
			1. 条件判断を挟むことができない
			1. 情報変換が許されない
	1. 計算フィールドが自動更新されない。保存しないと値が再更新されない。lookupフィールドも同じ。
	1. データ型（{name:{value:string}}という型）が扱いにくい
1. ビュー
	1. レイアウトの編集がGUI主体
		1. スクリプトで一気に設定したいが、いちいちapiを使ってごにょごにょする必要があるので面倒
	1. 独自入力欄をネイティブ入力欄と同じ扱いで表示させることができない。
	1. json型を設定できないし、その値を表示することもできない
1. 権限
	1. レコードごとの権限設定にて、条件の基準が「レコードの欄の値がxxならooユーザーにcrudを許す」という形式のみに限られる。
		1. 複数の条件を合成することもできるが、「レコードの欄の値がxxなら」という条件に部分集合が生じると、優先順位に沿ってすべて上書きされてしまう。→すべての項目にadminの権限を書き足さなけれならない。
1. バックアップ・版数管理
	1. レコードの出力：csvで出力されるので、先頭に0がつく数字はExcelで数値型になってしまう。0が潰れる。
	1. レコードのフルバックアップを効率よく取る手段が存在しない
	1. アプリのバックアップがしにくい。（zipファイルで出力できるが、pluginの設定など一部が欠如する）
	1. アプリの版数管理ができない。
	1. レコードの読み込み：lookupで連動先レコードが生き残っていないと、取り込み時にエラーになる
1. 開発環境
	1. ステージングが用意できない
		1. ステージング用のアプリを本番環境に作るしかない。
