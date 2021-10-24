// @ts-check
//
// The line above enables type checking for this file. Various IDEs interpret
// the @ts-check directive. It will give you helpful autocompletion when
// implementing this exercise.

/**
 * Removes duplicate tracks from a playlist.
 *
 * @param {string[]} playlist song playlist
 * @returns {string[]} new playlist with unique entries
 */
export function removeDuplicates(playlist) {
  return [...new Set(playlist)];
}

/**
 * Checks whether a playlist includes a track.
 *
 * @param {string[]} playlist song playlist
 * @param {string} track song
 * @returns {boolean} whether the track is in the playlist
 */
export function hasTrack(playlist, track) {
  return new Set(playlist).add(track).size === playlist.length;
}

/**
 * Adds a track to a playlist.
 *
 * @param {string[]} playlist song playlist
 * @param {string} track song
 * @returns {string[]} new playlist
 */
export function addTrack(playlist, track) {
  return [...new Set(playlist).add(track)];
}

/**
 * Deletes a track from a playlist.
 *
 * @param {string[]} playlist song playlist
 * @param {string} track song
 * @returns {string[]} new playlist
 */
export function deleteTrack(playlist, track) {
  const playlistSet = new Set(playlist);
  playlistSet.delete(track);
  return [...playlistSet];
}

/**
 * Lists the unique artists in a playlist.
 *
 * @param {string[]} playlist song playlist
 * @returns {string[]} list of artists
 */
export function listArtists(playlist) {
  const playlistSet = new Set(playlist);
  const artists = new Set();
  playlistSet.forEach((track) => {
    let trackData = track.split(' - ');
    artists.add(trackData[1]);
  });

  return [...artists];
}
