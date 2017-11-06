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

/**
 * Transforme un chaine en chaine préparée pour la recherche
 * @param s
 * @returns {string}
 */
function digest(s) {
	return s
		.split(' ')
		.filter(s => s !== '')
		.map(x => x.toLowerCase())
		.sort((x, y) => {
			if (x > y) {
				return 1;
			} else if (x < y) {
				return -1
			} else {
				return 0;
			}
		})
		.join(' ');
}

export default {
	levenshtein,
	digest
};