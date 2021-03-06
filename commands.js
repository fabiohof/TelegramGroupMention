let __mentions = {}

function setMentionsVar(mentions) {
  __mentions = mentions
}

function getMentionsVar() {
  return __mentions
}

function lexiComparator(a, b) {
  const nameA = a.toLowerCase()
  const nameB = b.toLowerCase()
  if (nameA < nameB) return -1
  if (nameA > nameB) return 1
  return 0
}

function createMention(mention, username) {
  if (__mentions[mention] !== undefined) return false
  __mentions[mention] = [username]
  return true
}

function assignToMention(mention, username) {
  if (__mentions[mention] === undefined) return false

  if (!__mentions[mention].find(u => u == username)) {
    __mentions[mention].push(username)
  }
  return true
}

function deleteMention(mention) {
  if (!Array.isArray(__mentions[mention])) return false
  delete __mentions[mention]
  return true
}

function getMention(mention, username) {
  if (__mentions[mention] === undefined || __mentions[mention].length == 0)
    return ""
  return __mentions[mention]
    .map(id => {
      return id !== username ? ` @${id}` : ""
    })
    .sort(lexiComparator)
    .join("")
}

function getMentionMembers(mention) {
  if (__mentions[mention] === undefined || __mentions[mention].length == 0)
    return ""
  return __mentions[mention].sort(lexiComparator).join(", ")
}

function getAllMentions(user) {
  return Object.keys(__mentions)
    .filter(id => (user ? __mentions[id].includes(user) : true))
    .map(id => `@${id}`)
    .sort(lexiComparator)
    .join("\n")
}

function unassign(mention, username) {
  if (__mentions[mention] === undefined) return false

  if (!__mentions[mention].find(u => u == username)) {
    return false
  }
  __mentions[mention] = __mentions[mention].filter(id => id !== username)
  return true
}

module.exports = {
  getMentionsVar,
  setMentionsVar,
  createMention,
  assignToMention,
  deleteMention,
  getMention,
  getMentionMembers,
  getAllMentions,
  unassign
}
