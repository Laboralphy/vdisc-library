/**
 * Created by ralphy on 22/06/17.
 */

/**
 * Reads 2DA files
 */


class F2DA {

	parseFieldList(sLine) {
		let aRegs = sLine.match(/[^\s"']+|"([^"]*)"|'([^']*)'/g);
		let n;
		for (let i = 0; i < aRegs.length; i++) {
			let sField = aRegs[i];
			if (sField.startsWith('"')) {
				n = sField.lastIndexOf('"');
				aRegs[i] = sField.slice(1,n);
			}
		}
		this._fields = aRegs;
		return aRegs;
	}


	/**
	 * Parses a data line
	 * @param sLine
	 * @returns {Array|{index: number, input: string}|*|Boolean}
	 */
	parseDataLine(sLine) {
		let aRegs = sLine.match(/[^\s"']+|"([^"]*)"|'([^']*)'/g);
		let n;
		let nRow = aRegs.shift();
		for (let i = 0; i < aRegs.length; i++) {
			let sField = aRegs[i];
			if (sField === "****") {
				aRegs[i] = null;
			} else if (sField.startsWith('"')) {
				n = sField.lastIndexOf('"');
				aRegs[i] = sField.slice(1,n);
			} else {
				n = Number(sField);
				if (!isNaN(n)) {
					aRegs[i] = n;
				}
			}
		}
		if (nRow.match(/^[0-9]+$/)) {
			if (this._data === undefined) {
				this._data = [];
			}
			this._data[nRow | 0] = aRegs;
		}
		return aRegs;
	}

	parseVersion(sLine) {
		let aReg = sLine.match(/^2DA V(.*)$/);
		if (aReg) {
			this._version = aReg[1];
			return this._version;
		} else {
			return null;
		}
	}

	getState() {
		if (!this._version) {
			return 'version';
		} else if (!this._fields) {
			return 'fieldlist';
		} else {
			return 'data';
		}
	}

	parseLine(sLine) {
		if (!this._version) {
			this.parseVersion(sLine);
		} else if (!this._fields) {
			this.parseFieldList(sLine);
		} else {
			this.parseDataLine(sLine);
		}
	}

	parse(sData) {
		sData
			.split('\n')
			.map(sLine => sLine.trim())
			.filter(sLine => !!sLine)
			.forEach(sLine => this.parseLine(sLine));
		let fields = this._fields;
		this._json = this._data.map(function(d) {
			let o = {};
			fields.forEach(function(f, i) {
				o[f] = d[i];
			});
			return o;
		});
	}
}


module.exports = F2DA;