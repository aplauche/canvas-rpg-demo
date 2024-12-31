export function moveTowards(person, destination, speed = 1){

  let  distanceX = destination.x - person.position.x
  let  distanceY = destination.y - person.position.y


  let distance = Math.sqrt(distanceX**2 + distanceY**2);



  if(distance <= speed){
    // Done just update person position to match destination
    person.position.x = destination.x
    person.position.y = destination.y

    distance = 0
  } else {
    // normalize and move toward destination at the speed amount
    let normalizedX = distanceX / distance
    let normalizedY = distanceY / distance

    person.position.x += normalizedX * speed
    person.position.y += normalizedY * speed

    // recalculate distance and return it
    distanceX = destination.x - person.position.x
    distanceY = destination.y - person.position.y
    distance = Math.sqrt(distanceX**2 + distanceY**2);

  }


  return distance

}