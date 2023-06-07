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
constructor(){
    this.id = data.id
    this.creatorId = data.creatorId
    this.eventId = data.eventId
    this.body = data.body
    
}
}