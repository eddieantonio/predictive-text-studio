<script lang="ts">
  import { Button } from "sveltestrap";
  import { Table } from "sveltestrap";
  import { Spinner } from "sveltestrap";
  import { Form, FormGroup, Input, Label } from "sveltestrap";

  const handleClick = () => alert("I warned you!");
  // SVELTEMA
  import "bulma/css/bulma.css";
  import Progress from "svelma/src/components/Progress.svelte";
</script>

<style>
</style>

<main role="application">
  <h1>sveltestrap</h1>
  <h3>Button</h3>
  <Button color="danger" on:click={handleClick}>Do Not Press</Button>
  <h3>Table</h3>
  <Table>
    <thead>
      <tr>
        <th>#</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Username</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">1</th>
        <td>Mark</td>
        <td>Otto</td>
        <td>@mdo</td>
      </tr>
      <tr>
        <th scope="row">2</th>
        <td>Jacob</td>
        <td>Thornton</td>
        <td>@fat</td>
      </tr>
      <tr>
        <th scope="row">3</th>
        <td>Larry</td>
        <td>the Bird</td>
        <td>@twitter</td>
      </tr>
    </tbody>
  </Table>
  <h3>Spinner</h3>
  <Spinner color="primary" />
  <h3>Input</h3>
  <Form>
    <FormGroup>
      <Label for="exampleEmail">Email</Label>
      <Input
        type="email"
        name="email"
        id="exampleEmail"
        placeholder="with a placeholder" />
    </FormGroup>
  </Form>
  <hr>
  <h1>SVELTEMA</h1>
  <h3>Button</h3>
  <Button type="is-success">Success</Button>
  <h3>Table</h3>
  <table class="table is-fullwidth">
    <thead>
      <tr>
        <th />
        <th>First Name</th>
        <th>Last Name</th>
        <th>City</th>
        <th>State</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td colspan="5">
          <section class="section">
            <div class="content has-text-grey has-text-centered">
              <p><i class="far fa-3x fa-frown" /></p>
              <p>No data</p>
            </div>
          </section>
        </td>
      </tr>
    </tbody>
  </table>
  <h3>Progress Bar</h3>
  <Progress />
</main>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" />
</svelte:head>
