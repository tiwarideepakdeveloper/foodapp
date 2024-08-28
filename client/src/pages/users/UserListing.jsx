export default function UserListing(){
    
    const [photos, setPhotos] = useState([]);
    
    useEffect(() => {
      fetch('https://jsonplaceholder.typicode.com/photos')
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data);
          setPhotos(data);
        });
    }, []);

    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Navjot</td>
                    <td>Singh</td>
                </tr>
            </tbody>
        </table>
    );
        
}