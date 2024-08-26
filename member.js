function skillsMember() {
      // Get the current user's skills
  var member = Meteor.user();
  if (!member) {
    return;
  }
  return member.skills;
}