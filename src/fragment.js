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
  avatar
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
export const MESSAGE_FRAGMENT = `
  id
  text
  to {
    ${USER_FRAGMENT}
  }
  from {
    ${USER_FRAGMENT}
  }
`;

export const ROOM_FRAGMENT = `
  fragment RoomParts on Room {
    id
    participants {
      ${USER_FRAGMENT}
    }
    messages {
      ${MESSAGE_FRAGMENT}
    }
  }
`
