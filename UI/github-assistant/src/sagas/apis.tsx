
export async function fetchLoginInfo() {
    const response = await fetch('/auth/login');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
}

export async function saveNewChannel(data: any) {
    const response = await fetch('/api/channels', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(data)
    });
    const body = await response.json();
    if (response.status !== 200) throw new Error(body.message);
    return body;
}

export async function saveUserChatChannel(data: any) {
  const newChannelId = data.payload.signedUserName + '_' + data.payload.counterUserName;
  
  const response = await fetch('/api/users/'+data.payload.userId, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "PUT",
    body: JSON.stringify({userId: data.payload.counterUserId, channelId: newChannelId})
  });
  
  const responseCounter = await fetch('/api/users/'+data.payload.counterUserId, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "PUT",
    body: JSON.stringify({userId: data.payload.userId, channelId: newChannelId})
  });
  
  const responseChannel = await fetch('/api/channels', {
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({payload:{channelName :newChannelId, channelId: newChannelId, userChannel: true}})
  });
    
  const userOne = await response.json();
  const userTwo = await responseCounter.json();
  const newChannel = await responseChannel.json();
  
  if (response.status !== 201) throw new Error(userOne.message);
  if (responseCounter.status !== 201) throw new Error(userTwo.message);
  if (responseChannel.status !== 200) throw new Error(newChannel.message);
  return {
    userOne: userOne,
    userTwo: userTwo,
    newChannel: newChannel
  };
}

export async function saveNewMessage(data: any) {
    const response = await fetch(`./api/channels/${data.payload.channelId}`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "PUT",
        body: JSON.stringify({message: data.payload.messageValue, user: data.payload.currentUser})
    });
    const body = await response.json();
    if (response.status !== 201) throw Error(body.message);
    return body;
}

export async function retrieveChannels() {
    const response = await fetch('./api/channels');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
}

export async function retrieveUsers() {
    const response = await fetch('./api/users');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
}

export async function createGitRepo(data: any) {
    const response = await fetch(`/api/gitbot/createrepo/${data.payload.channelId}`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "PUT",
        body: JSON.stringify(data.payload.repoData)
    });
    const body = await response.json();
    if (response.status !== 201) throw Error(body.message);
    return body;
}

export async function addUsersToGitRepo(data: any) {
    const response = await fetch(`/api/gitbot/adduser/${data.payload.channelId}`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "PUT",
        body: JSON.stringify(data.payload.gitData)
    });
    const body = await response.json();
    if (response.status !== 201) throw Error(body.message);
    return body;
}

export async function createGitIssue(data: any) {
    const response = await fetch(`/api/gitbot/reportissue/${data.payload.channelId}`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "PUT",
        body: JSON.stringify(data.payload.issueData)
    });
    const body = await response.json();
    if (response.status !== 201) throw Error(body.message);
    return body;
}

export async function getOpenIssues(data: any) {
    const response = await fetch(`/api/gitbot/getissues/${data.payload.channelId}`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "PUT",
        body: JSON.stringify({repo: data.payload.repo})
    });
    const body = await response.json();
    if (response.status !== 201) throw Error(body.message);
    return body;
}

export async function editMessage(data: any) {
    const response = await fetch(`/api/channels/${data.payload.channelId}/messages`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "PUT",
        body: JSON.stringify({messageId: data.payload.messageId, messageValue: data.payload.messageValue})
    });
    const body = await response.json();
    if (response.status !== 201) throw Error(body.message);
    return body;
}

export async function deleteMessage(data: any) {
    const response = await fetch(`/api/channels/${data.payload.channelId}/messages`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "DELETE",
        body: JSON.stringify({messageId: data.payload.messageId})
    });
    const body = await response.json();
    if (response.status !== 202) throw Error(body.message);
    return body;
}