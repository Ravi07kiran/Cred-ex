import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import { BigNumber } from "ethers";
import {
  MediaRenderer,
  useActiveListings,
  useContract,
} from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import { marketplaceContractAddress } from "../addresses";

const Home: NextPage = () => {
  const router = useRouter();
  const { contract: marketplace } = useContract(marketplaceContractAddress, "marketplace");
  const { data: listings, isLoading: loadingListings } = useActiveListings(marketplace);

  return (
    <>
      
      <div className={styles.container}>
        
        <h1 className={styles.h1}>Cred&Ex</h1>
        <p className={styles.explain}>
        For Trustable Buy And Sell
        </p>

        <hr className={styles.divider} />

        <div style={{ marginTop: 32, marginBottom: 32 }}>
          <Link href="/create" className={styles.mainButton} style={{ textDecoration: "none" }}>
            Post Your Resell
          </Link>
        </div>

        <div className="main">
          {
            // If the listings are loading, show a loading message
            loadingListings ? (
              <div>Wait a Moment</div>
            ) : (
              // Otherwise, show the listings
              <div className={styles.listingGrid}>
                {! loadingListings ? (
        <div>
          {listings && listings.map((nft) => {
            return(
              
              <div>
                <MediaRenderer 
              src={nft.asset.image}
              height="200px"
              width="200px"
              />
               <p> {nft.asset.name}</p>
               <p>{nft.buyoutCurrencyValuePerToken.displayValue}Matic</p>
               <button 
               onClick={async () => {
                try{
                  await marketplace?.buyoutListing(BigNumber.from(nft.id),1);
                } catch(error){
                  console.error(error);
                  alert(error);
                }
               }}
               >Buy Now </button><button>View Details</button>
                </div>
            );
          })}
        </div>
      ) : (
        <div>Loading...</div>
      )}
              </div>
            )
          }
        </div>
      </div>
    </>
  );
};

export default Home;
