import crypto from 'crypto';

/**
 * Récupère les données de l'endpoint en utilisant les identifiants
 * particuliers developer.marvels.com
 * @param url l'end-point
 * @return {Promise<json>}
 */
export const getData = async (url) => {
    // A Compléter
    try {
        // Add your Marvel API public and private keys
        const publicKey = '2adfdfae58e2b9c211da24318aa119e0';
        const privateKey = '3a15b2e9e9f4e9e7cecc5631a1a7c470635ad1a0';
        const timestamp = new Date().getTime().toString();

        // const publicKey = process.env.PUBLIC_KEY;
        // const privateKey = process.env.PRIVATE_KEY;
        // const timestamp = process.env.TS;

        const hash = await getHash(publicKey, privateKey, timestamp);

        const response = await fetch(`${url}?ts=${timestamp}&apikey=${publicKey}&hash=${hash}`);
        // console.log(`${url}?ts=${timestamp}&apikey=${publicKey}&hash=${hash}`);

        const marvelData = await response.json();
        // console.log(marvelData);

        // Filter and transform the data
        const characters = marvelData.data.results
            .filter((character) => character.name && character.thumbnail.path && character.thumbnail.extension)
            .map((character) => ({
                // Assuming 'portrait_xlarge' is a valid size, replace it with the actual desired size
                imageUrl: `${character.thumbnail.path}/portrait_xlarge.${character.thumbnail.extension}`,
                name: character.name
            }));

        return characters;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

/**
 * Calcul la valeur md5 dans l'ordre : timestamp+privateKey+publicKey
 * cf documentation developer.marvels.com
 * @param publicKey
 * @param privateKey
 * @param timestamp
 * @return {Promise<ArrayBuffer>} en hexadecimal
 */
export const getHash = async (publicKey, privateKey, timestamp) => {
    // A compléter
    try {
        const dataToHash = timestamp + privateKey + publicKey;
        const hash = crypto.createHash('md5').update(dataToHash).digest('hex');
        return hash;
    } catch (error) {
        console.error('Error calculating hash:', error);
        throw error;
    }
}