function formatDateAndTime(dateString) {
    const date = new Date(dateString);
  
    // Format date as MM/DD/YYYY
    const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  
    // Format time as regular 12-hour format
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const amPm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    const formattedTime = `${hours}:${minutes.toString().padStart(2, '0')} ${amPm}`;
  
    return `${formattedDate} ${formattedTime}`;
}

export class Comment{
constructor(data){
    this.body = data.body
    this.createdAt = data.createdAt
    this.creator = data.creator
    this.picture = data.creator.picture
    this.creatorId = data.creatorId
    this.eventId = data.eventId
    this.id = data.id
    
}
}
