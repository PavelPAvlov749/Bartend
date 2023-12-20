
/**
 * Team Invite code Generator
 * Used in TeamPage -> genereate Invite code buton
 * 
 * @returns string 
 */
function generateInviteCode  ()  {
    // Create empty symbols array 
    let symbols : string[] = [];
    // InvideCode length
    let codeLength = 20;

    // Fill array with Uppercase letters,lowercase letters and numbers
    for (let i = 65;i <= 90;i++)
    {
        symbols.push(String.fromCharCode(i));
    }
    for (let i = 97; i <= 122;i ++) {
        symbols.push(String.fromCharCode(i));
    }
    for(let i = 48;i <= 57;i++)
    {
        symbols.push(String.fromCharCode(i));
    }
    

    let resultCode : string = ""
    // Generate random string from array charecters
    for (let i = 0;i <= codeLength;i ++) {
        resultCode += symbols[Math.ceil(Math.random() * symbols.length -1)];
    }

    return resultCode;

}

export default generateInviteCode;