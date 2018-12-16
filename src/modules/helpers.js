export const imgUrlGenerator = (player) => {
    // A function to process names beginning with Mc
    function haggis(name) {
        return `Mc${name.substring(2).toUpperCase()}`;
    }
    const baseUrl = (!player.status !== 'retired') ? 
    'http://s.afl.com.au/staticfile/AFL%20Tenant/Essendon/Player%20Profiles/2018%20-%20Profiles/' :
    'media/players/';
    const regex = /^(Mc)/gm;
    return (regex.test(player.surname)) ? `${baseUrl}${haggis(player.surname)}%20${player.name}.png`
    : `${baseUrl}${player.surname.toUpperCase()}%20${player.name}.png`;
}
