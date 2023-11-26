import AppInput from '@/Models/App/AppInput';
import Address from '@/Models/Address';

export default class AppTable {
    public readonly form: AppInput[][];
    public get formKeys(): string[] {
        return this.form.flat().map(item => item.code);
    };
    constructor(_form: AppInput[][]) {
        this.form = _form.filter(row => row.length !== 0);
    }
    map<T>(callbackfn: (inputs: AppInput[], i?: number, arr?: AppInput[][]) => T) {
        return this.form.map(callbackfn);
    }
    at(row: number) {
        return this.form[row] ?? [];
    }
    get([row, col]: Address) {
        return this.form[row]?.[col];
    }
    insert([x, y]: Address, inputData: AppInput) {
        if (!this.form[x]) {
            this.form[x] = [];
        }
        const newInputs = this.at(x).toSpliced(y, 0, inputData);
        return new AppTable(this
            .map((row, i) => i === x ? newInputs : row)
            .filter((row) => (row && row.length !== 0)));
    }
    update([x, y]: Address, value: AppInput) {
        const updatedRow = this.at(x).toSpliced(y, 1, value);
        console.log("updated row:", updatedRow);
        return new AppTable(this
            .map((row, i) => i === x ? updatedRow : row)
            .filter((row) => (row && row.length !== 0))
        );
    }
    move([fromRow, fromCol]: Address, [toRow, toCol]: Address) {
        if (fromRow === toRow) {
            const clone = Array.from(this.at(fromRow));
            const [removed] = clone.splice(fromCol, 1);
            clone.splice(toCol, 0, removed);
            return new AppTable(this.form
                .map((row, i) => i === fromRow ? clone : row)
                .filter((row) => (row && row.length !== 0))
            );
        }
        const item = this.get([fromRow, fromCol]);
        if (!item) { return this; }
        return new AppTable(this.form
            .map((row, i) => i === fromRow ? row.toSpliced(fromCol, 1) : i === toRow ? row.toSpliced(toCol, 0, item) : row)
            .filter((row) => (row && row.length !== 0))
        );
    }
    remove([x, y]: Address) {
        return new AppTable(this.form
            .map((row, i) => i === x ? row.toSpliced(y, 1) : row)
            .filter((row) => (row && row.length !== 0))
        );
    }
    toDTO() {
        return {
            form: this.form.map(row=>row.map(col=>col.toDTO())),
            form_keys: this.formKeys
        };
    }
}
