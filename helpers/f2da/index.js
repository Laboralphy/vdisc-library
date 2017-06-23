/**
 * Created by ralphy on 22/06/17.
 */

/**
 * Reads 2DA files
 */
const isNumber = require('is-number');

class F2DA {

	/**
	 * Parses a string and separates values.
	 * returns an array
	 * @param sLine {string} source string
	 * @returns {*|Array|{index: number, input: string}|Boolean}
	 */
	parseSSV(sLine) {
		return sLine
			.trim()
			.match(/[^\s"']+|"([^"]*)"|'([^']*)'/g)
			.map(function(sField) {
			if (sField === "****") {
				return null;
			} else if (sField.startsWith('"')) {
				return sField.slice(1, sField.lastIndexOf('"'));
			} else if (isNumber(sField)) {
				return Number(sField);
			} else {
				return sField;
			}
		});
	}

	parseVersion(sLine) {
		let aRegs = sLine.match(/^2DA V(.+)$/);
		if (aRegs) {
			return aRegs[1];
		} else {
			throw new Error('version number could not be parsed. line 1 should be like "2DA V..."');
		}
	}

	parseDefault(sLine) {
		sLine = sLine.trim();
		if (sLine !== '') {
			let aRegs = sLine.match(/^default:(.*)$/i);
			if (aRegs) {
				return aRegs[1].trim();
			} else {
				throw new Error('default value could not be parsed? line 2 should be empty or like "default: ...."');
			}
		} else {
			return '';
		}
	}

	checkColCount(aFields, aData) {
		let n = aFields.length;
		aData.forEach(function(d, i) {
			if (!((d.length === n) || (d.length === (n + 1) && d[0] == i))) {
				throw new Error('bad column count at row #' + i);
			}
		});
	}

	buildTable(aFields, aData) {
		let n = aFields.length;
		return aData.map(function(d, i) {
			let row = {};
			if (d.length === n) {
				d.forEach(function(c, x) {
					row[aFields[x]] = c;
				});
			} else if (d.length === (n + 1) && d[0] == i) {
				d.slice(1).forEach(function(c, x) {
					row[aFields[x]] = c;
				});
			} else {
				throw new Error('bad column count at row #' + i + '. row items count: ' + d.length + ' - fields count: ' + n + ' - row content: [' + d.join(', ') + ']');
			}
			return row;
		});
	}

	parse(sSource) {
		let aSource = sSource.split('\n');
		let sVersion = this.parseVersion(aSource.shift());
		let sDefault = aSource.shift();
		let aFields = this.parseSSV(aSource.shift());
		let aData = aSource.filter(sLine => sLine.trim().length > 0).map(this.parseSSV);
		return this.buildTable(aFields, aData);
	}
}

module.exports = F2DA;