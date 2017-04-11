//id here refers to the artwork id:
export function biddingOnAPiece(id) {
  return {
    type: 'BIDDING_ON_A_PIECE',
    id,
  };
}
