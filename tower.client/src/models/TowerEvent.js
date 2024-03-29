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
  
    return {formattedDate, formattedTime};
    
}


export class TowerEvent {
  constructor(data) {
    this.id = data.id;
    this.creatorId = data.creatorId
    this.name = data.name;
    this.description = data.description;
    this.coverImg = data.coverImg;
    this.location = data.location;
    this.capacity = data.capacity;
    this.startDate = formatDateAndTime(data.startDate).formattedDate || formatDateAndTime(new Date).formattedDate
    this.startTime = formatDateAndTime(data.startDate).formattedTime || formatDateAndTime(new Date).formattedTime
    this.isCanceled = data.isCanceled;
    this.type = data.type;
    this.ticketCount = data.ticketCount;
    this.creator = data.creator
    this.comment = data.comment
  }
}
