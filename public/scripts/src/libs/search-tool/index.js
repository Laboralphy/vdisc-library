/**
 * Created by ralphy on 06/11/17.
 */


/**
 * Calcule la distance levenshtein entre deux chaine
 * @param a {string} chaine source
 * @param b {string} chaine cible
 * @returns {number}
 */
function levenshtein(a, b) {
	if (a.length === 0) {
		return b.length;
	}
	if (b.length === 0) {
		return a.length;
	}

	let al = a.length;
	let bl = b.length;
	let i, j;

	let matrix = [];

	// increment along the first column of each row
	for (i = 0; i <= bl; ++i) {
		matrix[i] = [i];
	}

	// increment each column in the first row
	for (j = 0; j <= al; ++j) {
		matrix[0][j] = j;
	}

	// Fill in the rest of the matrix
	for (i = 1; i <= bl; ++i) {
		for (j = 1; j <= al; ++j) {
			if (b.charAt(i - 1) === a.charAt(j - 1)) {
				matrix[i][j] = matrix[i - 1][j - 1];
			} else {
				matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, // substitution
					Math.min(matrix[i][j - 1] + 1, // insertion
						matrix[i - 1][j] + 1)); // deletion
			}
		}
	}

	return matrix[b.length][a.length];
}

function removeDiacritics(sString) {
	return sString
		.normalize('NFD')
		.replace(/[\u0300-\u036F]/g, '');
}

function removeNonAlphanum(sString) {
	return sString
		.replace(/[\u0021-\u0029\u003A-\u0040\u005B-\u0060\u007B-\u007E]/g, ' ');
}

function simplifyString(sString) {
	return removeNonAlphanum(removeDiacritics(sString));
}

/**
 * Calcule la ressemblence entre 2 chaines.
 * Le calcul se fait mot à mot
 * @param sText {string}
 * @param sSearch {string}
 */
function pertinence(sText, sSearch) {

    function simplifyAndFilter(s) {
        return simplifyString(s)
            .toLowerCase()
            .split(' ')
            .filter(s => s !== '');
    }

    // chaque mot de aSearch doit être recherché dans aText
    let aSimplifiedText = simplifyAndFilter(sText);
    let pert = simplifyAndFilter(sSearch)
        .map(wSearch => aSimplifiedText
            .map(wText => levenshtein(wText, wSearch))
            .reduce((prev, n) => Math.min(prev, n), Infinity)
        )
        .sort()
        .join('-');
    return pert;
}



export default {
	levenshtein,
	pertinence,
	simplifyString
};