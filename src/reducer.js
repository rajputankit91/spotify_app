import { reducerCases } from "./Constants";

export const initialState = {
  token: null,
  playlists: [],
  userInfo: null,
  selectedPlaylistId: "37i9dQZF1E37jO8SiMT0yN",
  selectedPlaylist: null,
};
// //   currentPlaying: null,
// //   playerState: false,

const reducer = (state, action) => {
  switch (action.type) {
    case reducerCases.SET_TOKEN:{
      return {
        ...state,
        token: action.token,
      };
    }
    case reducerCases.SET_PLAYLISTS:
      return {
        ...state,
        playlists: action.playlists,
      };
    case reducerCases.SET_USER:
      return {
        ...state,
        userInfo: action.userInfo,
      };

    case reducerCases.SET_PLAYLIST:
      return {
        ...state,
        selectedPlaylist: action.selectedPlaylist,
      };

    default:
      return state;
  }
}
export default reducer;
  
//     case reducerCases.SET_PLAYING:
//       return {
//         ...state,
//         currentPlaying: action.currentPlaying,
//       };
//     case reducerCases.SET_PLAYER_STATE:
//       return {
//         ...state,
//         playerState: action.playerState,
//       };
//     case reducerCases.SET_PLAYLIST_ID:
//       return {
//         ...state,
//         selectedPlaylistId: action.selectedPlaylistId,
//       };
