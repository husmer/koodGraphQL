import {gql} from "@apollo/client"

export const GET_USER_INFO = gql`
    query User {
        user {
        id
        login
        createdAt
        auditRatio
        }
    }
`;
//user id: 10356
export const GET_USER_LEVEL = gql`
query Level($userId: Int!) {
    transaction(
        where: {userId: {_eq: $userId }, type: {_eq: "level"}, object: {type: {_nregex: "exercise|raid"}}}
        order_by: { amount: desc }
        limit: 1
      ) {
        amount
      }
  }
`

export const GET_USER_XP = gql`
query XP{
    transaction(
      order_by: { createdAt: asc }
      where: { type: { _eq: "xp" }, object: { type: { _eq: "project" } }  }
    ) {
      userId
      amount
      createdAt
      object {
        name
        type
      }
    }
  }
`;

  