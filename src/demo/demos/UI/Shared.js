import React, { useState } from 'react'
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button
} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Frame, Spacer, Heading } from 'bootflex'
import { FaApple } from 'react-icons/fa'
import { FaConnectdevelop } from 'react-icons/fa'
import { FaBattleNet } from 'react-icons/fa'
import { FaBlackberry } from 'react-icons/fa'
import { FaForumbee } from 'react-icons/fa'
import { FaTwitter } from 'react-icons/fa'
import BextLogo from '../../images/BextLogo.png'

export const SampleNav = (props) => {
  return (
    <Navbar variant='dark' expand='lg' className='p-0 w-100'>
      <i className='fa fa-bars text-light' />
      <Navbar.Brand as={Link} className='p-0 ml-2' to='/'>
        <img src={BextLogo} alt='TRUSTPOINT' />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='mr-auto'>
          <Nav.Link as={Link} to='/'>
            Home
          </Nav.Link>
          <Nav.Link as={Link} to='#'>
            Page 1
          </Nav.Link>
          <Nav.Link as={Link} to='#'>
            Page 2
          </Nav.Link>
          <NavDropdown title='Dropdown' id='basic-nav-dropdown'>
            <NavDropdown.Item href='#action/3.1'>Action</NavDropdown.Item>
            <NavDropdown.Item href='#action/3.2'>
              Another action
            </NavDropdown.Item>
            <NavDropdown.Item href='#action/3.3'>Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href='#action/3.4'>
              Separated link
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Form inline>
          <FormControl type='text' placeholder='Search' className='mr-sm-2' />
          <Button className='mt-2 mt-lg-0' variant='outline-dark'>
            Search
          </Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  )
}

export const DemoNavbar = (props) => {
  let [showText, setShowText] = useState(false)
  return (
    <>
      <Nav defaultActiveKey='/home' className='flex-column'>
        <Heading>
          <b>SAMPLE SIDEBAR</b>
        </Heading>
        <Spacer />
        <form className='form-inline'>
          <input
            className='w-100 form-control mr-sm-2'
            type='search'
            placeholder='Sample Search'
            aria-label='Search'
          />
        </form>
        <Nav.Link href='/home'>Active</Nav.Link>
        <Nav.Link eventKey='link-1'>Sample Link #1</Nav.Link>
        <Nav.Link eventKey='link-2'>Sample Link #2</Nav.Link>
        <Nav.Link eventKey='link-3'>Sample Link #3</Nav.Link>
        <Nav.Link eventKey='link-4'>Sample Link #4</Nav.Link>
        <Nav.Link eventKey='link-5'>Sample Link #5</Nav.Link>
        <NavDropdown title='Sample Dropdown' id='collasible-nav-dropdown'>
          <NavDropdown.Item href='#action/3.1'>Action</NavDropdown.Item>
          <NavDropdown.Item href='#action/3.2'>Another action</NavDropdown.Item>
          <NavDropdown.Item href='#action/3.3'>Something</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href='#action/3.4'>Separated link</NavDropdown.Item>
        </NavDropdown>
        <Nav.Link eventKey='link-6'>Sample Link #6</Nav.Link>
        <Nav.Link eventKey='link-7'>Sample Link #7</Nav.Link>
        <Nav.Link eventKey='link-8'>Sample Link #8</Nav.Link>
      </Nav>
      <Button
        className='w-100'
        variant='success'
        onClick={() => {
          setShowText(!showText)
        }}
      >
        TOGGLE EXTRA TEXT
      </Button>
      <Spacer />
      <Frame className={`${showText ? '' : 'd-none'} p-2`}>{loremAside}</Frame>
    </>
  )
}

export const DemoSmallPanel = (props) => {
  let [showText, setShowText] = useState(false)
  return (
    <>
      <Heading>
        <b>SIDEBAR</b>
      </Heading>
      <Spacer />
      <div className='d-flex flex-column align-items-center justify-content-center'>
        <FaApple className='mb-2' color='indigo' size='48px' />
        <FaConnectdevelop className='mb-2' color='blue' size='48px' />
        <FaBattleNet className='mb-2' color='red' size='48px' />
        <FaBlackberry className='mb-2' color='green' size='48px' />
        <FaTwitter className='mb-2' color='cyan' size='48px' />
        <FaForumbee className='mb-2' color='jade' size='48px' />
      </div>
      <Spacer />
      <Button
        className='w-100'
        variant='success'
        onClick={() => {
          setShowText(!showText)
        }}
      >
        TOGGLE EXTRA TEXT
      </Button>
      <Spacer />
      <Frame className={`${showText ? '' : 'd-none'} p-2`}>{loremAside}</Frame>
    </>
  )
}

export const loremAside = `
Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint, eum suscipit. Omnis numquam, illo nesciunt laudantium blanditiis dolor dignissimos reprehenderit quod facilis delectus in, facere quis, autem consequatur. Omnis, quibusdam?
Nesciunt consequuntur laudantium vitae odio fugiat quia voluptas voluptatum veritatis id maiores sapiente quas in, quisquam hic illo eius praesentium labore, aliquam corrupti minus eum? Ratione architecto impedit ex quia.
Assumenda, sed. Et culpa facilis, eius non pariatur, rerum delectus itaque nisi iusto quis nostrum porro consequuntur commodi officia tenetur deleniti debitis accusamus rem illum saepe molestiae ab? Dignissimos, excepturi.
Necessitatibus illum dolore quas ratione dignissimos quibusdam odio iure similique aspernatur expedita sequi libero ipsum, atque, laboriosam in at. Et molestias eos id maxime, sit esse qui deleniti. Fuga, eligendi.
Similique autem non corporis cum exercitationem mollitia, odio eius et earum itaque recusandae praesentium ad corrupti hic qui eum iusto repellendus laboriosam veniam alias sunt consequuntur blanditiis? Repudiandae, earum deserunt.
Eum aliquid totam neque, fugit, accusamus amet magnam laboriosam, vel dicta quia architecto voluptas? Sint sequi quod, nihil debitis odit recusandae voluptas deleniti, optio, tempore delectus eos voluptates a atque?
Minima reprehenderit magni distinctio expedita quas voluptatem ad provident sapiente consectetur, quaerat eaque dolorum odit eum, numquam vitae tempora reiciendis blanditiis fugit rerum itaque perspiciatis! Consectetur a libero dolores repellendus.
Architecto molestias accusamus amet laudantium optio, laborum, ut excepturi iusto dolorem omnis est exercitationem voluptates quis explicabo corrupti consectetur velit porro, doloremque repellat. Voluptate quaerat, ducimus aspernatur vel nulla enim?
In voluptatum sapiente asperiores ad aperiam suscipit facere, enim, repellat culpa harum totam ratione debitis ducimus? Earum odit consectetur rem, voluptates illum, blanditiis cum ipsum inventore veritatis deserunt eum hic?
Autem reprehenderit itaque impedit mollitia commodi omnis saepe non veritatis inventore optio facilis accusamus earum beatae odio, repellendus corporis labore, cum, aspernatur eveniet! Facilis expedita dolorem dolores omnis! Alias, quae!`

export const loremContent = `
Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit minus quas, iure eaque possimus doloremque voluptatem dolore? Quis soluta, optio accusamus tenetur et necessitatibus sapiente distinctio iure, eaque, beatae eos.
Corrupti minus quas, numquam ad laborum ea molestias eligendi, reprehenderit mollitia impedit iure officiis voluptatibus ab excepturi. Blanditiis earum sit rem nam voluptate! Voluptatem dolore temporibus reiciendis ratione a aperiam.
Repellendus provident, ullam corporis magnam necessitatibus sequi tenetur velit laudantium! Illo id earum odio saepe? Itaque adipisci quasi pariatur quod illum! Modi libero dolorem esse ad quas ut, fugiat ducimus.
Quo, quisquam ipsum. Rem ullam nam maiores unde. Necessitatibus, eius consequatur? Harum voluptatum eaque aut saepe, quasi praesentium aliquam hic culpa magni distinctio esse incidunt suscipit cum ipsum iure alias.
Totam aliquam illum quisquam eveniet temporibus, unde vitae beatae atque. Non nostrum nihil optio reiciendis laudantium. Assumenda ad, corporis doloribus architecto minima sint fugit voluptates nisi nobis! Ab, nisi vel!
Laboriosam blanditiis officiis quas, qui reiciendis dolorum non voluptatem, omnis ipsa natus porro modi enim adipisci quia ad tempora velit veritatis. Adipisci molestias obcaecati molestiae a, omnis quisquam expedita. Sint!
Vero reiciendis quibusdam est ea rerum ipsa praesentium assumenda dicta voluptas ex cupiditate mollitia, consequatur optio illo omnis quos distinctio molestiae dolore. Aspernatur, veniam pariatur sunt autem mollitia eligendi consectetur!
Nulla, mollitia sed atque obcaecati rerum sit quaerat consequatur laboriosam. Consequatur quidem corporis dignissimos cum? Expedita, iusto quaerat iste, repellendus minima nostrum laboriosam ad nam dolore ea dolorum beatae veniam?
Quo vero optio nesciunt corrupti, maiores illum perferendis neque, animi architecto voluptas alias exercitationem magni qui laudantium sunt explicabo doloremque quas nobis non numquam hic consequuntur, repellat recusandae? Similique, sint.
Quod facere, quibusdam laboriosam nostrum dolore molestiae sed inventore porro? Totam, unde deserunt? Doloremque, quo, quam aperiam explicabo aspernatur rem maxime earum doloribus culpa ipsa repellat vero quaerat, a deleniti.
Soluta libero mollitia sit tempore ipsum aliquid iure corporis cum expedita. Pariatur aut amet vel quibusdam quae ea explicabo culpa ullam iusto. Perspiciatis, assumenda delectus voluptatibus ipsam excepturi sapiente enim.
Esse iure, magnam delectus voluptatem aperiam architecto eum illo veniam quisquam quia dolores fuga, cupiditate facere? Sequi ullam eveniet est sunt sapiente rem excepturi eaque deleniti, necessitatibus, quae repellat quaerat.
Velit consectetur consequatur voluptates magnam quaerat provident ab architecto, saepe aperiam, obcaecati iste optio eum, beatae libero nisi placeat. Facilis eos consequuntur consectetur corrupti repellat dolor nulla consequatur velit provident.
Autem sit corrupti adipisci fugiat error cupiditate non, praesentium eum consectetur et illo? Necessitatibus sit, id, rem incidunt molestiae veritatis dignissimos modi sed impedit explicabo dolorem cupiditate similique optio? Nisi?
Sed, necessitatibus. Rerum totam sunt excepturi non! Deserunt, quasi numquam quod animi illo unde adipisci eius sequi minima, earum iusto excepturi in provident cum tenetur iste commodi, laborum expedita esse.
Harum quod perspiciatis vel corrupti consequuntur ex obcaecati aliquid distinctio, eos recusandae culpa reprehenderit minima, accusamus dolorem suscipit, non magni asperiores illum at voluptate laudantium fuga amet! Assumenda, architecto nobis!
Accusantium dolorem minus rem veniam libero laboriosam, assumenda, nihil maxime nesciunt eligendi atque eum et. Illo possimus numquam omnis, explicabo facilis porro animi est! Consequatur perspiciatis sequi ex libero dicta?
Totam nemo corrupti quae ut consequatur temporibus voluptate quos, quia tenetur perferendis assumenda repellat perspiciatis atque aliquid fugit vero inventore, tempore molestias asperiores ipsa cum beatae vel similique! Atque, impedit.
Deserunt, maiores? Consectetur corporis totam animi tenetur magni, accusamus natus exercitationem distinctio esse cupiditate aperiam. Obcaecati voluptatum cupiditate voluptate deserunt vero autem, impedit a laudantium numquam eaque delectus ipsam! Sit?
Sapiente, perferendis provident! Harum libero beatae amet sequi sapiente autem laudantium, ad quis totam ipsum atque corporis animi quod doloribus. Quidem non in esse iste quas autem accusantium rem error.
Sed aliquam quas cupiditate ratione nostrum quisquam repellendus, consectetur asperiores in alias ipsa libero. Mollitia voluptatum quasi sint debitis harum consequatur accusamus reiciendis provident enim? Quod, deserunt obcaecati. Recusandae, et!
In exercitationem quo sed commodi saepe quasi at aspernatur necessitatibus, ad quod soluta mollitia ratione aliquam tenetur nemo earum nam dicta possimus enim iusto molestias corrupti! Sint voluptatem repellendus molestias.
Earum ipsum nobis illo perferendis eius officia beatae. Dolore veniam labore iste impedit temporibus. Illum sapiente voluptatem, veritatis sequi culpa vel voluptate necessitatibus, recusandae distinctio aliquam vero neque reiciendis minus.
Ut quos delectus sit neque, magnam nobis voluptatibus mollitia fuga, maxime dolor unde magni aliquam iusto ducimus labore sequi. Earum corporis numquam illo exercitationem est a quos porro saepe sed.
Labore consequuntur, quo aut deleniti natus mollitia repellendus ut velit porro iure distinctio. Sunt, quod. Voluptatum mollitia voluptas delectus, blanditiis est eum. Minima delectus molestias esse iure, incidunt quos impedit!
Distinctio maiores sint voluptatem tempora, non voluptatum commodi inventore molestias? Cum natus repellendus autem, magnam tempora atque. Quia illum delectus non recusandae, maiores numquam expedita placeat. Quia suscipit accusantium ipsa.
Laboriosam fugiat nulla blanditiis facere fugit expedita iste quo, reprehenderit architecto aut? Vero, saepe, esse itaque aspernatur voluptatem tempore perferendis sequi illo obcaecati necessitatibus hic, quas magnam dolorum fuga expedita.
Nisi ex totam perspiciatis nam nobis, itaque, dignissimos et architecto quidem tenetur quos, eius modi iste facilis tempore omnis repudiandae quisquam molestiae rerum consequatur esse. Ipsam similique blanditiis non illo!
Quidem distinctio repellendus dicta autem atque perferendis quod corrupti explicabo velit dolores, voluptate repudiandae nostrum rerum molestiae magni soluta quo voluptates alias aliquid, natus doloremque excepturi, esse rem pariatur! Soluta.
Quis quisquam illo minus laudantium in unde, amet animi recusandae. Nemo quaerat dolorum nihil aperiam maxime, iure consectetur fugiat placeat. Aut tenetur ex minima voluptatibus quod numquam in veritatis saepe.
Dignissimos et odio in dolorum libero sequi minus sit quidem modi nihil nulla, illum id laudantium qui illo inventore ab! Velit dolorum excepturi debitis nam esse quidem quis reprehenderit itaque.
Tempora distinctio quo impedit explicabo voluptas illum deleniti facere maiores exercitationem, possimus rerum molestiae? Sunt vel nam quasi numquam deleniti, dignissimos eligendi. Aut odit, deleniti magni similique illo quae nisi?
Amet enim ad consequuntur corporis vitae eum hic? Delectus deleniti commodi hic iste assumenda porro consequatur excepturi cumque! Sint distinctio ipsam repellendus maiores nisi doloremque eveniet assumenda harum recusandae cum!
Ratione, eius doloribus rem eum reiciendis a? Sapiente accusantium vitae, consectetur ipsam voluptatem dignissimos sit optio quam delectus veniam adipisci rem enim iure minima consequatur temporibus. Esse tenetur natus laboriosam.
Reprehenderit fuga iure eius commodi aliquid? Incidunt ut nihil at minus eligendi consectetur similique ducimus tempore cumque? Blanditiis obcaecati reprehenderit non consequatur hic, officiis quidem placeat ea fugit. Exercitationem, delectus.
Dicta iste repellat corporis ipsa maxime magni in quidem inventore neque quaerat earum, nulla quis quisquam dolores tempora sequi! Ea ipsam eos aut error aspernatur voluptates vitae nesciunt sint inventore?
Quos, alias. Eius illo cum tempora adipisci repellendus. Fugiat necessitatibus neque, harum natus odit facere vitae in, voluptatibus maxime eveniet sed dolores nihil, amet corrupti cumque corporis recusandae error ex!
Architecto, earum! Delectus libero totam magni voluptatibus necessitatibus debitis temporibus perferendis. A ipsa necessitatibus animi itaque est praesentium dolore beatae quidem aliquid blanditiis odit, eos, quas dolorum possimus illum quo.
Id quos illum deleniti blanditiis! Error esse dicta dolorem nobis! Minima porro, rerum rem vitae nihil nam ipsa esse sed pariatur? Iure incidunt voluptates optio itaque voluptatibus hic provident aliquam.
Et temporibus deleniti maxime quisquam fugit ad sequi quia, odit ea harum nemo, magnam dicta veniam voluptatum aliquam voluptate, magni commodi at eos. Neque, maiores eius vero laudantium earum suscipit.
Doloremque, at accusamus quo corporis, qui autem, reprehenderit necessitatibus molestiae provident pariatur nam nulla minima mollitia dolorem beatae nesciunt placeat aliquam architecto aut. Odio rem voluptatem explicabo quod totam id.
Sequi laborum, numquam eum asperiores maxime saepe est itaque nobis pariatur, animi, recusandae natus iste? Veritatis odit similique ullam qui sequi eius, quia, ipsam unde temporibus autem reiciendis quibusdam ipsa.
Veniam, quod minus sint consectetur eaque nostrum suscipit reprehenderit molestiae. Incidunt odio illum molestiae corporis. Dolores fuga voluptatem, asperiores minus nemo quibusdam, perferendis incidunt pariatur velit porro, veniam consequatur non.
Dicta neque commodi repellendus quae repudiandae eum aperiam perferendis perspiciatis tenetur soluta dolore, architecto voluptatum cupiditate provident reiciendis ipsum, impedit nemo. Animi distinctio, voluptas beatae impedit nam natus recusandae obcaecati!
Aut nulla aliquam porro eos ipsa, fuga minima. Quas quae consectetur magnam impedit doloremque eaque corporis corrupti illo commodi reprehenderit ex vel earum repudiandae, quod non, delectus unde cum voluptate?
Sit quae cum voluptates aperiam deserunt? Possimus temporibus expedita atque eveniet obcaecati. Ab ea quos perspiciatis ducimus a dolorum voluptates natus, hic molestias aut asperiores assumenda unde! Eius, odio necessitatibus!
Officiis maxime voluptas laudantium iure, veritatis rem, consequuntur, commodi exercitationem in quibusdam excepturi laborum asperiores voluptatem ducimus perspiciatis. Corrupti non quisquam culpa odit ratione repellat nihil illo laborum ea accusamus.
Officiis corporis beatae, voluptate, error placeat eligendi labore mollitia possimus libero minima vitae cum vel. Iste excepturi sed aliquam earum animi quam aperiam eaque, officia, harum nihil quos obcaecati assumenda.
Corrupti, cum consequuntur, voluptatibus, nisi blanditiis quidem quis eos asperiores fugit adipisci quod excepturi. Reprehenderit magnam incidunt voluptate magni quis omnis nulla minima optio molestias ullam, eveniet illo ex quasi?
Veniam unde aliquam earum dolores repellendus odio, fugit perspiciatis velit alias accusantium, assumenda ipsam ratione totam architecto animi? Deleniti sint reprehenderit quis qui maiores vero nihil blanditiis nesciunt voluptatem magnam!`
