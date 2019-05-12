export const COMMENT_FRAGMENT = `
  id
  text
  user {
    id
    name
  }
`;

export const USER_FRAGMENT = `
  id
  name
`

export const FILE_FRAGMENT = `
  id
  url
`

export const FULL_POST_FRAGMENT = `
  fragment PostParts on Post {
    id
    location
    caption
    files {
      id
      url
    }
    comments {
      id
      text
    }
    user {
      id
      name
    }
  }
`;

export const ROOM_FRAGMENT = `
  fragment RoomParts on Room {
    id
    participants {
      id
    }
  }
`