import { ADD_PEER, REMOVE_PEER } from "./peerActions";

type PeerState = Record<string, { stream: MediaStream }>;

interface AddPeer {
  type: typeof ADD_PEER;
  payload: { peerId: string; stream: MediaStream };
}

interface RemovePeer {
  type: typeof REMOVE_PEER;
  payload: { peerId: string };
}

type PeerAction = AddPeer | RemovePeer;

export const peersReducer = (state: PeerState, action: PeerAction) => {
  switch (action.type) {
    case ADD_PEER:
      return {
        ...state,
        [action.payload.peerId]: {
          stream: action.payload.stream,
        },
      };

    case REMOVE_PEER:
      const { [action.payload.peerId]: deleted, ...rest } = state;
      return rest;

    default:
      return {
        ...state,
      };
  }
};
